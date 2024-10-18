const puppeteer = require("puppeteer-core");

const usernamesToSearch = [
  "billmonday",
  "jackbenjamin",
  "boba5000",
  "0xh3x",
  "kan2106",
  "frank_168",
  "ik3377",
  "lilmatic",
  "yap00012",
  "lkyd01",
  "nongwaan",
  "bundo9",
  "0xneaf",
  "kenobi_eth",
  "noey168",
  "hefs_2200",
  "jonathanhnd11",
  "tmdv8",
  "reborn8958",
  "dos4289",
  "davenguyencrp",
  "onlinelink",
  "lastexamdoteth",
  "siomay.eth",
]; // Array of usernames to search

(async () => {
  const browser = await puppeteer.connect({
    browserWSEndpoint:
      "ws://127.0.0.1:9222/devtools/browser/59e1814c-4a66-40fe-bd68-75f4b6c650fc",
  });

  // Get the opened pages
  const openedPages = await browser.pages();

  // Filter out the Discord page
  const page = openedPages.filter((page) => {
    return page.url().includes("discord");
  })[0];

  // Wait for the search bar to be available
  await page.waitForSelector('[class^="searchBar_"]');

  // Function to perform the search for a given username
  const searchForUsername = async (usernameToSearch) => {
    try {
      // Clear the search bar before typing
      await page.click('[class^="searchBar_"]', { clickCount: 3 });
      await page.keyboard.press("Backspace");

      // Type the username to search
      await page.type('[class^="searchBar_"]', usernameToSearch);
      // await page.keyboard.down("Meta");
      // await page.keyboard.press("v");
      // await page.keyboard.up("Meta");

      await page.waitForSelector('[id="FILTER_FROM-header"] + li', {
        timeout: 10000,
      });

      // Extract results from the "From User" section
      const fromUserResults = await page.$$('[id="FILTER_FROM-header"] + li');

      // Check if there is exactly one result in "From User"
      if (fromUserResults.length === 1) {
        const avatarElement = await page.$('[class^="displayAvatar_"]');
        const usernameElement = await page.$('[class^="displayUsername_"]');
        const nicknameElement = await page.$('[class^="displayedNick_"]');

        const avatarUrl = await avatarElement.evaluate((element) =>
          element.getAttribute("src")
        );
        const foundUsername = await usernameElement.evaluate(
          (element) => element.textContent
        );
        const nickname = await nicknameElement.evaluate(
          (element) => element.textContent
        );

        // Parse userId from the avatar URL (if possible)
        const userIdMatch =
          avatarUrl.match(/\/users\/(\d+)\//) ||
          avatarUrl.match(/\/avatars\/(\d+)\//);
        const userId = userIdMatch ? userIdMatch[1] : "User ID not found";

        const data = {
          userId,
          nickname,
          username: foundUsername,
          avatarUrl,
        };
        console.log(data);
      } else {
        console.log("fromUserResults", fromUserResults);
        console.log(
          "Error: No result or multiple results found in 'From User'."
        );
      }
    } catch (error) {
      // Handle the case where no results appear (timeout)
      if (error.name === "TimeoutError") {
        console.log(
          `Error: No results found for the search query "${usernameToSearch}".`
        );
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  // Function to process the array of usernames with a random delay between searches
  const processUsernames = async () => {
    const timeStart = new Date().getTime();

    for (const username of usernamesToSearch) {
      // Perform the search for the current username
      await searchForUsername(username);

      // Generate a random delay between 100 and 1000 milliseconds
      const randomDelay = 100;

      // Wait for the random delay before processing the next username
      await new Promise((resolve) => setTimeout(resolve, randomDelay));
    }

    const timeEnd = new Date().getTime();
    const timeDiff = timeEnd - timeStart;
    console.log(`Processing completed in ${timeDiff}ms.`);

    // Disconnect from the browser after processing all usernames
    await browser.disconnect();
  };

  // Start processing the usernames
  await processUsernames();
})();
