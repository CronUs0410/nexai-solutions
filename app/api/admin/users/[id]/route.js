import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { name, email, password, role, adminUid } = await request.json();

    const callerDoc = await adminDb.collection("users").doc(adminUid).get();
    if (!callerDoc.exists || callerDoc.data().role !== "superadmin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const authUpdates = {
      displayName: name,
      email: email,
    };
    if (password && password.trim() !== "") {
      authUpdates.password = password;
    }

    await adminAuth.updateUser(id, authUpdates);

    await adminDb.collection("users").doc(id).update({
      name,
      email,
      role
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const adminUid = searchParams.get('adminUid');

    if (!adminUid) {
       return NextResponse.json({ error: "No admin uid provided" }, { status: 400 });
    }

    const callerDoc = await adminDb.collection("users").doc(adminUid).get();
    if (!callerDoc.exists || callerDoc.data().role !== "superadmin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await adminAuth.deleteUser(id);
    await adminDb.collection("users").doc(id).delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
