import AV from 'leancloud-storage';

// Initialize LeanCloud
AV.init({
  appId: process.env.NEXT_PUBLIC_VALINE_APP_ID,
  appKey: process.env.NEXT_PUBLIC_VALINE_APP_KEY,
  serverURL: process.env.NEXT_PUBLIC_VALINE_SERVER_URLS
});

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { email, name, subscription_type, interests } = body;

    // Validate required fields
    if (!email) {
      return Response.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // Create a new subscription object in LeanCloud
    const Subscription = AV.Object.extend('Subscription');
    const subscription = new Subscription();

    // Set the subscription data
    subscription.set('email', email);
    subscription.set('name', name || '');
    subscription.set('subscriptionType', subscription_type || 'Newsletter');
    subscription.set('interests', interests || 'Nature stories, Wildlife photography, Conservation insights');
    subscription.set('subscribedAt', new Date());
    subscription.set('status', 'active');
    subscription.set('source', 'website');

    // Save to LeanCloud
    await subscription.save();

    return Response.json(
      { 
        success: true, 
        message: 'Thank you for subscribing to Nature\'s Whispers! You\'ll receive our latest nature stories and wildlife insights.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Subscription error:', error);
    
    // Handle duplicate email error
    if (error.code === 137) {
      return Response.json(
        { 
          success: false, 
          message: 'This email is already subscribed to our newsletter.' 
        },
        { status: 409 }
      );
    }

    return Response.json(
      { 
        success: false, 
        message: 'Something went wrong. Please try again later.' 
      },
      { status: 500 }
    );
  }
}