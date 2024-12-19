export async function callReprexAPI(messages: { role: string; content: string }[]): Promise<string> {
  try {
    console.log("Sending payload to API:", JSON.stringify({ messages }, null, 2)); // Payload loglama

    // OpenAI API isteği
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // API anahtarı
      },
      body: JSON.stringify({
        model: "gpt-4-turbo", // Kullanılacak model
        messages, // Gönderilen mesajlar
        max_tokens: 50, // Yanıt uzunluğu
        temperature: 0.7, // Rastgelelik seviyesi
      }),
    });

    console.log("API response status:", response.status); // API yanıt durumu

    if (!response.ok) {
      const errorData = await response.json(); // Hata detaylarını al
      console.error("OpenAI API error:", errorData); // Hata detaylarını logla
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    console.log("API Response:", data); // API yanıtını logla

    // Yanıtın içeriğini döndür
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error in API call:", error);
    return "Reprex: Sorry, something went wrong.";
  }
}