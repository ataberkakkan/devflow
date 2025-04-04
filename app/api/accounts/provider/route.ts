import { NextResponse } from "next/server";

import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import connectDb from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const { providerAccountId } = await request.json();

  try {
    await connectDb();

    const validatedData = AccountSchema.partial().safeParse({
      providerAccountId,
    });

    if (!validatedData.success)
      throw new ValidationError(validatedData.error.flatten().fieldErrors);

    const user = await Account.findOne({ providerAccountId });
    if (!user) throw new NotFoundError("Account");

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
