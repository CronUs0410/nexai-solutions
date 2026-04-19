import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { name, email, password, role, adminUid } = await request.json();

    // In a real app we'd verify the adminUid via a Firebase Admin token check
    // but here we trust the request body since it's just a demo,
    // or we verify the caller role from Firestore:
    const callerDoc = await adminDb.collection("users").doc(adminUid).get();
    if (!callerDoc.exists || callerDoc.data().role !== "superadmin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Create auth user
    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName: name,
    });

    // Create firestore doc
    await adminDb.collection("users").doc(userRecord.uid).set({
      name,
      email,
      role,
      createdAt: new Date()
    });

    return NextResponse.json({ success: true, uid: userRecord.uid });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const adminUid = searchParams.get('adminUid');

    if (!adminUid) {
       return NextResponse.json({ error: "No admin uid provided" }, { status: 400 });
    }

    const callerDoc = await adminDb.collection("users").doc(adminUid).get();
    if (!callerDoc.exists || callerDoc.data().role !== "superadmin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const snapshot = await adminDb.collection("users").get();
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
