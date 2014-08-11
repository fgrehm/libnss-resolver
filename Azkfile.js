/**
 * Documentation: http://docs.azk.io/Azkfile.js
 */

var envs = {
  DNS_DOMAIN: "resolver.dev",
  DNS_IP: "127.0.0.2",
}

// Adds the systems that shape your system
systems({
  build: {
    // Dependent systems
    depends: ["dns"],
    // More images:  http://images.azk.io
    image: "azukiapp/gcc",
    workdir: "/azk/#{manifest.dir}",
    command: "# command to run app",
    shell: "/bin/bash",
    // Mounts folders to assigned paths
    mount_folders: {
      '.': "/azk/#{manifest.dir}",
      './mocker/nsswitch.conf': "/etc/nsswitch.conf",
    },
    envs: envs,
  },

  dns: {
    image: "azukiapp/azktcl:0.0.2",
    command: "dnsmasq --no-daemon --address=/$DNS_DOMAIN/$DNS_IP",
    wait: false,
    ports: {
      dns: "53/udp",
    },
    envs: envs,
  },
});


