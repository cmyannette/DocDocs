using System.Net.Http.Headers;
using System.Text;
using Newtonsoft.Json;
using DotNetEnv;

public class ZoomFactory
{
    public class TokenResponse
    {
        public string accessToken { get; set; }

    }

    // Method to get Zoom API access token using Server-to-Server OAuth
    private async Task<string> GetAccessToken()
    {
        Env.Load();
        
        string clientId = Env.GetString("ZOOM_CLIENT_ID");
        string clientSecret = Env.GetString("ZOOM_CLIENT_SECRET");
        string accountId = Env.GetString("ZOOM_ACCOUNT_ID");

        if (string.IsNullOrEmpty(clientId) || string.IsNullOrEmpty(clientSecret) || string.IsNullOrEmpty(accountId))
        {
            throw new Exception("Client ID, Client Secret, or Account ID is not set in environment variables.");
        }

        string authString = $"{clientId}:{clientSecret}";
        string authBase64 = Convert.ToBase64String(Encoding.UTF8.GetBytes(authString));

        using (var client = new HttpClient())
        {
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", authBase64);

            var url = $"https://zoom.us/oauth/token?grant_type=client_credentials&account_id={accountId}";

            var response = await client.PostAsync(url, null);
            var content = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                var tokenResponse = JsonConvert.DeserializeObject<TokenResponse>(content);
                return tokenResponse.accessToken;
            }
            else
            {
                throw new Exception($"Failed to get access token: {response.StatusCode} {response.ReasonPhrase}. Response content: {content}");
            }
        }
    }

}