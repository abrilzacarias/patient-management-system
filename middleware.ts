import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decryptKey } from "@/lib/utils"; 

export function middleware(req: NextRequest) {
  const encryptedKey = req.cookies.get("accessKey")?.value || "";

  if (!encryptedKey) {
    console.log("🔴 No hay cookie de accessKey, redirigiendo...");
    return NextResponse.redirect(new URL("/", req.url));
  }

  const accessKey = decryptKey(encryptedKey);

  if (accessKey !== process.env.ADMIN_PASSKEY) {
    console.log("🔴 Clave incorrecta, redirigiendo...");
    return NextResponse.redirect(new URL("/", req.url));
  }

  console.log("🟢 Clave correcta, permitiendo acceso...");
  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
