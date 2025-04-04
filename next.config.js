module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "i.postimg.cc", 
      "bootdey.com", 
      "encrypted-tbn0.gstatic.com", 
      "images.pexels.com",
      "plus.unsplash.com",
    ], 
    remotePatterns: [
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/photos/**",
      },
    ],
  },
};