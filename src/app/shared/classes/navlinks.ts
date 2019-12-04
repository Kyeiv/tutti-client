export const teacherNavlinks = (username: string) => [
  { label: "Lekcje", path: "appointments" },
  { label: "Blog", path: `blog/${username}` },
  { label: "Mój profil", path: "my-profile" }
];

export const studentNavlinks = [
  { label: "Lekcje", path: "appointments" },
  { label: "Mój profil", path: "my-profile" }
];
