import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'properties.json');

export async function GET() {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const properties = JSON.parse(fileContents);
    return NextResponse.json(properties);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read properties' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newProperties = await request.json();
    fs.writeFileSync(dataFilePath, JSON.stringify(newProperties, null, 2), 'utf8');
    return NextResponse.json({ success: true, properties: newProperties });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update properties' }, { status: 500 });
  }
}
