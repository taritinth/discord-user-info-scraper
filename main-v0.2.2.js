// fetch(
//   "https://discord.com/api/v9/users/281394328767692801/profile?guild_id=1036357772826120242",
//   {
//     headers: {
//       accept: "*/*",
//       "accept-language": "en-US,en;q=0.9",
//       authorization:
//         "MjgxMzk0MzI4NzY3NjkyODAx.G-h9z1.9SGgUjD8w02eGQL8PEY-NpDMQgATKy9OgQOaNg",
//       priority: "u=1, i",
//       "sec-ch-ua":
//         '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
//       "sec-ch-ua-mobile": "?0",
//       "sec-ch-ua-platform": '"macOS"',
//       "sec-fetch-dest": "empty",
//       "sec-fetch-mode": "cors",
//       "sec-fetch-site": "same-origin",
//       "x-debug-options": "bugReporterEnabled",
//       "x-discord-locale": "en-US",
//       "x-discord-timezone": "Asia/Bangkok",
//       "x-super-properties":
//         "eyJvcyI6Ik1hYyBPUyBYIiwiYnJvd3NlciI6IkNocm9tZSIsImRldmljZSI6IiIsInN5c3RlbV9sb2NhbGUiOiJlbi1VUyIsImJyb3dzZXJfdXNlcl9hZ2VudCI6Ik1vemlsbGEvNS4wIChNYWNpbnRvc2g7IEludGVsIE1hYyBPUyBYIDEwXzE1XzcpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8xMjkuMC4wLjAgU2FmYXJpLzUzNy4zNiIsImJyb3dzZXJfdmVyc2lvbiI6IjEyOS4wLjAuMCIsIm9zX3ZlcnNpb24iOiIxMC4xNS43IiwicmVmZXJyZXIiOiIiLCJyZWZlcnJpbmdfZG9tYWluIjoiIiwicmVmZXJyZXJfY3VycmVudCI6IiIsInJlZmVycmluZ19kb21haW5fY3VycmVudCI6IiIsInJlbGVhc2VfY2hhbm5lbCI6InN0YWJsZSIsImNsaWVudF9idWlsZF9udW1iZXIiOjMyOTgwNCwiY2xpZW50X2V2ZW50X3NvdXJjZSI6bnVsbH0=",
//       cookie:
//         "__dcfduid=20b4d2a0798411ef92174b63dff40ea4; __sdcfduid=20b4d2a1798411ef92174b63dff40ea42e49d512fe72f133aab26589a55dfc993263bd9512b5efbd22c560bbf18d164b; locale=en-US; _gcl_au=1.1.1888767483.1727079387; _ga_Q149DFWHT7=GS1.1.1727079387.1.1.1727079401.0.0.0; _gid=GA1.2.349316054.1727082018; __cfruid=1eab8d80a0003e49b9bdd70ae2278351f57d93dd-1727144544; _cfuvid=4udeWRsh_mGz5jXaZTE7mB_gZ7A_xTo0Zs3TbCDA.9I-1727144544273-0.0.1.1-604800000; cf_clearance=CTtAXBID5cKQnfYxnHVsdCg2z3WioFcGVax8eVNDBmk-1727150530-1.2.1.1-I4Tw0XEUV9wZE9oNJ_kI45..F6anuF_7wSZPTjJ5R8Qi5zE6sWST0bWXJ5Z7Dj_3.jywbaaXbjgG_4TirTWjkaLEwRDxj5hj_EICPvM1dVr5jjT9cPMffIvK2RjwmLWgcySFgNExX231wh_HoH0FV_CrkcElMrVlAQ6Awj7ps92QgPGE2NbcLOOqFPhTJ2MXUvsEGx8hqrEzdL4SNiaMR1x.O.jm28D4J7GGqVtrlwqftUSp0.rhRgvgi51Gzw9Sz1zLEYPT1Nli.WhYxcIBTQLNIpkdmg7GWbkEs0mLr0oL2Mst8EcvVjko4B.c_7gyb8pcTgEfpajZ.lP1X7aGeVGecbv9RuCR_FNVeywVftxsoo7YKJwwdxVjP8EqxUPBZZecnHy3Tdv_F9UzwJM5PA; _ga=GA1.1.2031107531.1727079387; OptanonConsent=isIABGlobal=false&datestamp=Tue+Sep+24+2024+11%3A03%3A02+GMT%2B0700+(Indochina+Time)&version=6.33.0&hosts=&landingPath=https%3A%2F%2Fdiscord.com%2F&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1; _ga_YL03HBJY7E=GS1.1.1727150582.2.0.1727150587.0.0.0",
//       Referer:
//         "https://discord.com/channels/1036357772826120242/1159504868692742166/1287649943439540287",
//       "Referrer-Policy": "strict-origin-when-cross-origin",
//     },
//     body: null,
//     method: "GET",
//   }
// );

// const puppeteer = require("puppeteer-core");
// const clipboard = require("clipboardy");

import puppeteer from "puppeteer-core";
import fs from "fs";

// const usernamesToSearch = [
//   "billmonday",
//   "jackbenjamin",
//   "boba5000",
//   "kan2106",
//   "frank_168",
//   "ik3377",
//   "lilmatic",
//   "yap00012",
//   "lkyd01",
//   "nongwaan",
//   "bundo9",
//   "0xneaf",
//   "kenobi_eth",
//   "noey168",
//   "hefs_2200",
//   "jonathanhnd11",
//   "tmdv8",
//   "reborn8958",
//   "dos4289",
//   "davenguyencrp",
//   "onlinelink",
//   "lastexamdoteth",
//   "siomay.eth",
// ]; // Array of usernames to search

// const usernamesToSearch = [
//   "be_kindplss",
//   "kan2106",
//   "jackbenjamin",
//   "chackky",
//   "apesage",
//   "papayou",
//   "ceeedweak",
//   "jedlyk",
//   "dani.dan",
//   "n1c0cs",
//   "matti003",
//   "baikan",
//   "erkincem",
//   "cusandara",
//   "cryptoaga",
//   "sugar6378",
//   "minunplusle",
//   "jackhauteville",
//   "billmonday",
//   "jackbenjamin",
//   "boba5000",
//   "0xh3x",
//   "kan2106",
//   "frank_168",
//   "ik3377",
//   "lilmatic",
//   "yap00012",
//   "lkyd01",
//   "nongwaan",
//   "bundo9",
//   "0xneaf",
//   "kenobi_eth",
//   "noey168",
//   "hefs_2200",
//   "jonathanhnd11",
//   "tmdv8",
//   "reborn8958",
//   "dos4289",
//   "davenguyencrp",
//   "onlinelink",
//   "lastexamdoteth",
//   "siomay.eth",
//   "lydicius",
//   "shubhx",
//   "yhl",
//   "heikel",
//   "ristrettocat",
//   "dooonut",
//   "willy4619",
//   "oldsix",
//   "bigcat6680",
//   "deneth",
//   "jonski7768",
//   "hong9292",
//   "gurt5914",
//   "arf11",
//   "firehaux",
//   "tolkien41",
//   "cal1.f",
//   "ssick",
//   "shimmoney",
//   "cryptobulz",
//   "totemforyou",
//   "brocoliwang",
// ]; // Array of usernames to search

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
  "trenny gf",
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
  "port_dev",
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
  "brocoliwangg",
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
  "zeuz777",
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
  "milawh",
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
        timeout: 10000,
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

      const data = {
        userId,
        displayName,
        username,
        avatarUrl,
      };

      console.log(data);
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
