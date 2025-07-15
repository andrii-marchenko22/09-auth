import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parse } from "cookie";
import { checkServerSession } from "./lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Якщо користувач не залогінений (нема accessToken)
  if (!accessToken) {
    // Якщо є refreshToken — спробувати оновити сесію
    if (refreshToken) {
      const data = await checkServerSession();
      const setCookie = data.headers["set-cookie"];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);
          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path,
            maxAge: Number(parsed["Max-Age"]),
          };
          if (parsed.accessToken)
            cookieStore.set("accessToken", parsed.accessToken, options);
          if (parsed.refreshToken)
            cookieStore.set("refreshToken", parsed.refreshToken, options);
        }

        // після оновлення токенів — якщо public route, редірект на /
        if (isPublicRoute) {
          return NextResponse.redirect(new URL("/", request.url), {
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
        }

        // якщо private route — пропускаємо далі
        if (isPrivateRoute) {
          return NextResponse.next({
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
        }
      }
    }

    // Якщо приватна сторінка — редірект на /sign-in
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // Публічні сторінки — пропускаємо
    if (isPublicRoute) {
      return NextResponse.next();
    }

    // Інші запити — пропускаємо
    return NextResponse.next();
  }

  // Якщо користувач залогінений (є accessToken)
  if (accessToken) {
    // Дозволяємо тільки /sign-up залогіненим
    if (pathname === "/sign-up") {
      return NextResponse.next();
    }

    // Інші публічні сторінки (наприклад /sign-in) — редірект на /
    if (isPublicRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Приватні та інші — пропускаємо
    return NextResponse.next();
  }

  // Все інше — пропускаємо
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
