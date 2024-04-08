import { PrismaClient, RolesNames, PermissionNames } from "@prisma/client";

const prisma = new PrismaClient();

const permissions = [
  {
    name: PermissionNames.viewProduct,
    description: "view (read) Product models",
    roles: Object.values(RolesNames), // all roles can read
  },
  {
    name: PermissionNames.manageProduct,
    description: "manage (create, update, delete) Product models",
    roles: [RolesNames.Admin],
  },
  {
    name: PermissionNames.viewCorrespondent,
    description: "view (read) Correspondent models",
    roles: Object.values(RolesNames), // all roles can read
  },
  {
    name: PermissionNames.manageCorrespondent,
    description: "manage (create, update, delete) Correspondent models",
    roles: [RolesNames.Admin],
  },
];

async function main() {
  // Create roles (if they don't exist)
  for (const role of Object.values(RolesNames)) {
    await prisma.role.upsert({
      where: { name: role },
      update: {},
      create: {
        name: role,
      },
    });
  }

  // Create permissions
  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: { name: permission.name },
      update: {
        name: permission.name,
        description: permission.description, // assign the description from permission object
        roles: {
          connect: permission.roles.map((role) => ({ name: role })),
        },
      },
      create: {
        name: permission.name,
        description: permission.description, // assign the description from permission object
        roles: {
          connect: permission.roles.map((role) => ({ name: role })),
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
