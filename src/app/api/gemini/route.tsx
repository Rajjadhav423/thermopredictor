import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Set this in your environment variables
export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required.' }, { status: 400 });
        }

        if (!GEMINI_API_KEY) {
            return NextResponse.json({ error: 'Gemini API key not configured.' }, { status: 500 });
        }

        // Enhanced prompt for seawater analysis context
        const enhancedPrompt = `You are a marine chemistry expert AI assistant specializing in seawater analysis. Provide accurate, informative, and engaging responses about seawater properties, marine chemistry, and oceanography. Use appropriate scientific terminology but keep explanations accessible. Use emojis to make responses more engaging.

User query: ${prompt}

Please provide a helpful and informative response:`;

        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{ 
                    parts: [{ text: enhancedPrompt }] 
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                },
                safetySettings: [
                    {
                        category: "HARM_CATEGORY_HARASSMENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_HATE_SPEECH", 
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    }
                ]
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            console.error('Gemini API Error:', error);
            return NextResponse.json({ 
                error: 'Failed to get response from Gemini API',
                details: error 
            }, { status: response.status });
        }

        const data = await response.json();
        
        // Validate response structure
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            console.error('Invalid Gemini response structure:', data);
            return NextResponse.json({ 
                error: 'Invalid response from Gemini API',
                data: data 
            }, { status: 500 });
        }

        return NextResponse.json(data);
        
    } catch (error) {
        console.error('Gemini API Route Error:', error);
        return NextResponse.json({ 
            error: 'Internal server error while calling Gemini API.',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}