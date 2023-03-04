-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Message" ("createdAt", "description", "id") SELECT "createdAt", "description", "id" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
