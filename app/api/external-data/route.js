export async function GET() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    if (!apiUrl) {
      console.error('NEXT_PUBLIC_API_URL environment variable is not set');
      return Response.json(
        { error: 'API URL not configured' },
        { status: 500 }
      );
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(apiUrl, { 
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return Response.json(data, {
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=300', // Cache for 5 minutes
      },
    });
  } catch (error) {
    console.error('Error fetching data from external API:', error.message);
    return Response.json(
      { error: 'Failed to fetch data from external API' },
      { status: 500 }
    );
  }
}