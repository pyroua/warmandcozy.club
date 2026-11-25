const baseUrl = (process.argv[2] || "https://warmandcozy.club").replace(/\/$/, "");

async function run() {
  const checks = [
    { url: `${baseUrl}/`, allowedStatuses: [200, 301, 302] },
    { url: `${baseUrl}/nl/`, allowedStatuses: [200] },
    { url: `${baseUrl}/en/`, allowedStatuses: [200] },
    { url: `${baseUrl}/de/`, allowedStatuses: [200] },
    { url: `${baseUrl}/fr/`, allowedStatuses: [200] },
    { url: `${baseUrl}/llms.txt`, allowedStatuses: [200] },
    { url: `${baseUrl}/manifest.webmanifest`, allowedStatuses: [200] },
    { url: `${baseUrl}/favicon.ico`, allowedStatuses: [200] },
  ];

  let failed = 0;
  for (const check of checks) {
    try {
      const res = await fetch(check.url, { redirect: "manual" });
      if (!check.allowedStatuses.includes(res.status)) {
        console.error(
          `FAIL ${check.url}: got ${res.status}, expected one of [${check.allowedStatuses.join(", ")}]`
        );
        failed++;
      } else {
        console.log(`OK   ${check.url} -> ${res.status}`);
      }
    } catch (err) {
      console.error(`ERR  ${check.url}:`, err instanceof Error ? err.message : String(err));
      failed++;
    }
  }

  if (failed > 0) {
    process.exit(1);
  }
  console.log("All warmandcozy.club SRE smoke checks passed.");
}

run();
