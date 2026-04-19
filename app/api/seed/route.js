import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export const dynamic = 'force-dynamic';

const DEFAULT_SERVICES = [
  { icon: "🌐", name: "Website Development", description: "Modern, responsive websites built for performance and growth", order: 1 },
  { icon: "🤖", name: "AI Automation", description: "Automate repetitive tasks with intelligent AI workflows", order: 2 },
  { icon: "⚙️", name: "Workflow Design", description: "Custom workflow systems that save hours of manual work daily", order: 3 },
  { icon: "📄", name: "Document Processing", description: "AI-powered document extraction, filling and processing at scale", order: 4 },
  { icon: "🎬", name: "Product Advertisement Video", description: "Eye-catching video ads that convert viewers into customers", order: 5 },
  { icon: "📊", name: "Data Entry AI", description: "Eliminate manual data entry with intelligent automation", order: 6 },
  { icon: "🎨", name: "Poster Design", description: "Professional posters and graphics for your brand", order: 7 }
];

export async function GET() {
  try {
    const servicesSnap = await adminDb.collection("services").get();
    let count = 0;
    
    if (servicesSnap.empty) {
      const batch = adminDb.batch();
      DEFAULT_SERVICES.forEach((svc) => {
        const docRef = adminDb.collection("services").doc();
        batch.set(docRef, {
          ...svc,
          createdAt: new Date()
        });
        count++;
      });
      await batch.commit();
      return NextResponse.json({ success: true, message: `Seeded ${count} default services.` });
    }

    return NextResponse.json({ success: true, message: "Services already exist. Skipped seeding." });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
