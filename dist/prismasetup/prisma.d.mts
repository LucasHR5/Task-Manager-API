import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";
declare const prisma: PrismaClient<{
    adapter: PrismaBetterSqlite3;
}, never, import("@prisma/client/runtime/client").DefaultArgs>;
export default prisma;
//# sourceMappingURL=prisma.d.mts.map