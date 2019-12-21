export const teacherNavlinks = (username: string) => [
  { label: "Lekcje", path: "my-appointments" },
  { label: "Blog", path: `blog/${username}` },
  { label: "Mój profil", path: "my-profile" }
];

export const studentNavlinks = [
  { label: "Lekcje", path: "my-appointments" },
  { label: "Mój profil", path: "my-profile" }
];
