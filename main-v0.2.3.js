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

const discordIdsLowerCase = [
  "vodkla",
  "eric6414",
  "littlemonkeyb",
  "boba5000",
  "reganz21",
  "frank_168",
  "dos4289",
  "chackky",
  "smilypong",
  "0xh3x",
  "huak01",
  "noey168",
  "bibbu__",
  "ozzyxbt",
  "blackwindow9",
  "ketamah",
  "hefs_2200",
  "deus_vult_xyz",
  "ik3377",
  "hansmillie2",
  "henryle20",
  "kenobi_eth",
  "0xmike7",
  "pokemonad_xyz",
  "noey168",
  "rosin.h",
  "stargirl.007",
  "jasonreal",
  "cryptoaga",
  "jen_nyt0314",
  "mthuy0301",
  "leonardo_real",
  "ethiasol",
  "medusa_xyz",
  "cassini8620",
  "naufalqwe",
  "ctb_hallelujah",
  "retrodiskotek",
  "_enesakbaba",
  "g.orwell",
  "bad_friend",
  "jonathanhnd11",
  "gizdusum",
  "andalf",
  "jonkojap",
  "melo",
  "juninuna_",
  "penguin.gmi",
  "lastexamdoteth",
  "mcdell",
  "lydiapuspita",
  "fairy2257",
  "febrian_fedry",
  "midodododo",
  "witzqie",
  "lkyd01",
  "fdc1506",
  "4y4744",
  "zzdw_zz",
  "_danimeister_",
  "_seven7777777_",
  "yadappn",
  "savant",
  "llovani",
  "niccinft",
  "cookiezxc",
  "benjanad",
  "kimchiii0319",
  "taily_waily",
  "glitch7295",
  "toadster69",
  "mamio7590",
  ".godbreathed",
  "lz.cosmo",
  "b0ttybutterhandz",
  ".growthmindset",
  "live2own",
  "ceeedweak",
  "veroxis",
  "donut0369",
  "kraius.",
  "portdev",
  "nathan8644",
  "frogwell",
  "eviltahaaa",
  "nongwaan",
  "chinesedevil0xy63",
  "miyamoto5139",
  "singularity66",
  "mindymolly124",
  "zella.nft",
  "arcyeth",
  "brocoliwang",
  ".geekyoptimist",
  "shroomskull",
  "0xmichu",
  "minunplusle",
  "daisy",
  "mumoo77",
  "chiyachita",
  "cocoisgoodcat",
  "jaylelikez",
  "kan2106",
  "melodynoir",
  "prateek_s",
  "jkp3650",
  "arpang_",
  "jitgwayyy",
  "phuketpro",
  "diegovas_",
  "berzanorg",
  "vishyishere",
  "morningstarluciferx",
  "aedan5146",
  "mr.mnm.",
  "yung2105",
  "0xreinn",
  "tequilawaifu",
  "_yeeet",
  "choco0031",
  "dewaxindo",
  "suppercious",
  "mynamesincerity",
  "sailornini",
  "oak_._._",
  "kaybuuuuuu",
  "wani19kk",
  "puresoul0109",
  "jasonreal",
  "sharkdogsad",
  "dr.cryptonyt",
  "vaz1212",
  "._.havoc._.",
  "ohmyol1",
  "defigelato",
  "0xmoondancer",
  "kunyuan_9999",
  "c137_ck",
  "golden.pigy",
  "thezinweb3",
];

(async () => {
  const browser = await puppeteer.connect({
    browserWSEndpoint:
      "ws://127.0.0.1:9222/devtools/browser/a7b51511-e91a-416e-a58c-513be0acbc81",
  });

  // Get the opened pages
  const openedPages = await browser.pages();

  // Filter out the Discord page
  const page = openedPages.filter((page) => page.url().includes("discord"))[0];

  let total = discordIdsLowerCase.length;
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

    for (const username of discordIdsLowerCase) {
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
