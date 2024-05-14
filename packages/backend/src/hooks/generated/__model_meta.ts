/* eslint-disable */
const metadata = {
    models: {
        user: {
            name: 'User', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                }, name: {
                    name: "name",
                    type: "String",
                }, email: {
                    name: "email",
                    type: "String",
                }, profilePic: {
                    name: "profilePic",
                    type: "String",
                }, role: {
                    name: "role",
                    type: "Role",
                    isDataModel: true,
                    backLink: 'users',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "roleId" },
                }, roleId: {
                    name: "roleId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'role',
                }, manageres: {
                    name: "manageres",
                    type: "Product2Manager",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'manager',
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, email: {
                    name: "email",
                    fields: ["email"]
                },
            }
            ,
        }
        ,
        role: {
            name: 'Role', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                }, name: {
                    name: "name",
                    type: "RolesNames",
                }, users: {
                    name: "users",
                    type: "User",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'role',
                }, permissions: {
                    name: "permissions",
                    type: "Permission",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'roles',
                    isRelationOwner: true,
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, name: {
                    name: "name",
                    fields: ["name"]
                },
            }
            ,
        }
        ,
        permission: {
            name: 'Permission', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                }, name: {
                    name: "name",
                    type: "PermissionNames",
                }, description: {
                    name: "description",
                    type: "String",
                }, roles: {
                    name: "roles",
                    type: "Role",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'permissions',
                    isRelationOwner: true,
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, name: {
                    name: "name",
                    fields: ["name"]
                },
            }
            ,
        }
        ,
        product: {
            name: 'Product', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                }, name: {
                    name: "name",
                    type: "String",
                }, stages: {
                    name: "stages",
                    type: "ProductStage",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'ownedProducts_stages',
                }, managers: {
                    name: "managers",
                    type: "Product2Manager",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'product',
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, name: {
                    name: "name",
                    fields: ["name"]
                },
            }
            ,
        }
        ,
        productStage: {
            name: 'ProductStage', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                }, stage: {
                    name: "stage",
                    type: "Stage",
                    attributes: [{ "name": "@default", "args": [] }],
                }, done: {
                    name: "done",
                    type: "Boolean",
                    attributes: [{ "name": "@default", "args": [{ "value": false }] }],
                }, ownedProducts_stages: {
                    name: "ownedProducts_stages",
                    type: "Product",
                    isDataModel: true,
                    isOptional: true,
                    backLink: 'stages',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "ownerProductId_stages" },
                }, ownerProductId_stages: {
                    name: "ownerProductId_stages",
                    type: "String",
                    isOptional: true,
                    isForeignKey: true,
                    relationField: 'ownedProducts_stages',
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                },
            }
            ,
        }
        ,
        product2Manager: {
            name: 'Product2Manager', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                }, product: {
                    name: "product",
                    type: "Product",
                    isDataModel: true,
                    backLink: 'managers',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "productId" },
                }, productId: {
                    name: "productId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'product',
                }, manager: {
                    name: "manager",
                    type: "User",
                    isDataModel: true,
                    backLink: 'manageres',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "managerId" },
                }, managerId: {
                    name: "managerId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'manager',
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                },
            }
            ,
        }
        ,
    }
    ,
    deleteCascade: {
        product: ['Product2Manager'],
    }
    ,
    authModel: 'User'
};
export default metadata;
