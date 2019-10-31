export const teacherNavlinks = (username: string) => [
  { label: "Appointments", path: "appointments" },
  { label: "Blog", path: `blog/${username}` },
  { label: "My profile", path: "my-profile" }
];

export const studentNavlinks = [
  { label: "Appointments", path: "appointments" },
  { label: "My profile", path: "my-profile" }
];
