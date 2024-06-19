/** @format */

import UserModel from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/User";
import { NextRequest, userAgent } from "next/server";
import { AuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";

export async function DELETE(request: Request, { params }: { params: { messageid: string } }) {
  const messageId = params.messageid;
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!session || session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Auhenticated",
      },
      { status: 401 }
    );
  }

  try {
    const updatedResult = await UserModel.updateOne({ _id: user._id }, { $pull: { message: { _id: messageId } } });
    if (updatedResult.modifiedCount == 0) {
      return Response.json(
        {
          success: false,
          message: "Message not Found or Already Delete",
        },
        { status: 401 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Message Deleted Successfully ",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error Deleting Message Route", error);
    return Response.json(
      {
        success: false,
        message: "Error Deleting Message",
      },
      { status: 500 }
    );
  }
}
