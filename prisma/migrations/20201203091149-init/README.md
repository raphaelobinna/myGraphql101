# Migration `20201203091149-init`

This migration has been generated by obinna at 12/3/2020, 9:11:49 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Books" (
"id" SERIAL,
    "Author_Name" TEXT NOT NULL,
    "Title" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "Comment" (
"id" SERIAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comment" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "Books.Author_Name_unique" ON "Books"("Author_Name")

ALTER TABLE "Comment" ADD FOREIGN KEY("authorId")REFERENCES "Books"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201203091149-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,27 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Books {
+  id      Int      @default(autoincrement()) @id
+  Author_Name   String   @unique
+  Title    String
+  Comments   Comment[]
+}
+
+model Comment {
+  id        Int      @default(autoincrement()) @id
+  createdAt DateTime @default(now())
+  comment   String
+  published Boolean  @default(false)
+  author_name    Books     @relation(fields: [authorId], references: [id])
+  authorId  Int
+}
```

