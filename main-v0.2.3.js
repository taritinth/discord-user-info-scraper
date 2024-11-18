import puppeteer from "puppeteer-core";
import fs from "fs";

import { encodeUsername } from "./utils.js";
import { ref, set, get } from "firebase/database";
import { db, storage } from "./firebase.js";

import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
// import { v4 as uuidv4 } from "uuid";

import guestSnapshot from "./snapshot-nov-9.json" assert { type: "json" };

(async () => {
  const browser = await puppeteer.connect({
    browserWSEndpoint:
      "ws://127.0.0.1:9222/devtools/browser/5ea66d57-f952-402b-9c41-5f902922737b",
  });

  // Get the opened pages
  const openedPages = await browser.pages();

  // Filter out the Discord page
  const page = openedPages.filter((page) => page.url().includes("discord"))[0];

  let total = guestSnapshot.length;
  let totalSuccess = 0;
  const resultsData = [];
  let errors = [];

  // Function to perform the search for a given username
  const searchForUsername = async (usernameToSearch) => {
    try {
      // Clear the search bar before typing
      await page.click('[role^="textbox"]', { clickCount: 3 });
      await page.keyboard.press("Backspace");

      // Type the username to search (with @ to trigger user search)
      await page.type('[role^="textbox"]', `@${usernameToSearch}`);

      // Wait for the search results to appear
      await page.waitForSelector('[role^="option"]', {
        timeout: 5000,
      });

      // Extract all results
      const results = await page.$$('[role^="option"]');

      if (results.length === 0) {
        console.log(
          `No results found for the search query "${usernameToSearch}".`
        );

        errors.push(usernameToSearch);
        return;
      }

      const result = results.find(async (_result) => {
        const _usernameElement = await _result.$(
          "[class*='autocompleteRowContentSecondary_']"
        );
        return (
          (await _usernameElement.evaluate(
            (element) => element.textContent
          )) === usernameToSearch
        );
      });

      if (!result) {
        console.log(
          `Attempted to find the username "${usernameToSearch}" in the search results, but it was not found.`
        );

        errors.push(usernameToSearch);
        return;
      }

      const avatarElement = await result.$('img[class*="avatar_"]');
      const displayNameElement = await result.$(
        "[class*='autocompleteRowContentPrimary_']"
      );
      const usernameElement = await result.$(
        "[class*='autocompleteRowContentSecondary_']"
      );

      if (!avatarElement || !displayNameElement || !usernameElement) {
        console.log(`Data for "${usernameToSearch}" not found.`);

        errors.push(usernameToSearch);
        return;
      }

      // Extract the avatar URL, display name, and username
      const avatarUrl = await avatarElement.evaluate((element) =>
        element.getAttribute("src").replace(/size=\d+/, "size=256")
      );
      const displayName = await displayNameElement.evaluate(
        (element) => element.textContent
      );
      const username = await usernameElement.evaluate(
        (element) => element.textContent
      );

      // Parse userId from the avatar URL (if available)
      const userIdMatch =
        avatarUrl.match(/\/users\/(\d+)\//) ||
        avatarUrl.match(/\/avatars\/(\d+)\//);
      const userId = userIdMatch ? userIdMatch[1] : "User ID not found";

      // Reference to the "users" collection in the Realtime Database
      const usersRef = ref(db, `users/${encodeUsername(username)}`);

      const userSnapshot = await get(usersRef);

      if (userSnapshot.exists()) {
        console.log(`User ${username} already exists.`);
        return;
      }

      // Generate a unique filename using uuid for the avatar
      const uniqueFileName = `${encodeUsername(username)}.webp`;

      // Upload the avatar image to Firebase Storage
      const avatarStorageRef = storageRef(storage, `avatars/${uniqueFileName}`);
      const avatarResponse = await fetch(avatarUrl); // Fetch the image from the original URL
      const avatarBlob = await avatarResponse.blob(); // Convert the image to a blob

      // Upload avatar blob to Firebase Storage with a UUID filename
      await uploadBytes(avatarStorageRef, avatarBlob, {
        cacheControl: "public,max-age=31536000", // 1 year cache
      });

      // Get the download URL for the uploaded avatar
      const avatarDownloadUrl = await getDownloadURL(avatarStorageRef);

      // Add user data (with avatarDownloadUrl) to the Realtime Database
      await set(usersRef, {
        userId: userId,
        username: username,
        displayName: displayName,
        avatarUrl: avatarDownloadUrl, // Save the download URL of the avatar
        connections: {}, // Initially empty connections
        lastActive: Date.now(), // Unix timestamp for last active time
      });

      console.log(`User ${username} added successfully with avatar.`);

      const data = {
        userId,
        displayName,
        username,
        avatarUrl: avatarDownloadUrl,
      };

      // console.log(data);
      resultsData.push(data);

      totalSuccess += 1;
    } catch (error) {
      if (error.name === "TimeoutError") {
        console.log(
          `Error: No results found for the search query "${usernameToSearch}".`
        );
        errors.push(usernameToSearch);
      } else {
        console.error("An unexpected error occurred:", error);
      }
      throw error;
    }
  };

  // Function to process the array of usernames with a random delay between searches
  const processUsernames = async () => {
    const timeStart = new Date().getTime();

    for (const username of guestSnapshot) {
      try {
        // Perform the search for the current username
        await searchForUsername(username);

        // Generate a random delay between 100 and 1000 milliseconds
        // const randomDelay = Math.floor(Math.random() * 900) + 100;

        // Wait for the random delay before processing the next username
        // await new Promise((resolve) => setTimeout(resolve, randomDelay));
      } catch (error) {
        continue;
      }
    }

    const timeEnd = new Date().getTime();
    const timeDiff = timeEnd - timeStart;
    console.log(`Processing completed in ${timeDiff}ms.`);

    // Write the results to a JSON file
    const filename = `results-${new Date().toISOString()}.json`;
    fs.writeFileSync(filename, JSON.stringify(resultsData, null, 2));

    // Disconnect from the browser after processing all usernames
    await browser.disconnect();
  };

  // Start processing the usernames
  await processUsernames();

  console.log(`Total: ${total}, Success: ${totalSuccess}`);
  console.log(`Errors: ${errors.length}`, JSON.stringify(errors, null, 2));
})();
