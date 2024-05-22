if (!URL.canParse(process.env.WORDPRESS_API_URL)) {
  throw new Error(`
    Please provide a valid WordPress instance URL.
    Add to your environment variables WORDPRESS_API_URL.
  `);
}
const path = require("path");
const { protocol, hostname, port, pathname } = new URL(
  process.env.WORDPRESS_API_URL
);

console.log(protocol, hostname, port, pathname);

/** @type {import('next').NextConfig} */
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        // hostname: "wp-next.local",
        hostname: "alwaysarmed.de",
      },
      {
        protocol: `${protocol.slice(0, -1)}`,
        hostname,
        port,
        pathname: `${pathname}/**`,
      },
    ],
  },
};
