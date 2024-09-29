using System.Net.Http.Headers;
using System.Text;
using Newtonsoft.Json;
using DotNetEnv;

public class ZoomFactory
{
    public class TokenResponse
    {
        public string access_token { get; set; }

    }

     public class RecordingResponse
    {
        public List<RecordingFile> recording_files { get; set; }
    }

    public class RecordingFile
    {
        public string file_type { get; set; }
        public string download_url { get; set; }
        public string recording_type { get; set; }
    }

    public async Task RetrieveAudioRecording(string meetingId)
    {
        try
        {
            var accessToken = await GetAccessToken();
            var recordings = await GetMeetingRecordings(meetingId, accessToken);
            var audioRecording = recordings.recording_files
                .FirstOrDefault(r => r.recording_type == "audio_only" && r.file_type == "WAV");

            if (audioRecording == null)
            {
                throw new Exception("Audio recording not found.");
            }

            var audioData = await DownloadRecordingFile(audioRecording.download_url, accessToken);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred: {ex.Message}");
        }
    }

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

            var url = $"https://zoom.us/oauth/token?grant_type=account_credentials&account_id={accountId}";

            var response = await client.PostAsync(url, null);
            var content = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                var tokenResponse = JsonConvert.DeserializeObject<TokenResponse>(content);
                return tokenResponse.access_token;
            }
            else
            {
                throw new Exception($"Failed to get access token: {response.StatusCode} {response.ReasonPhrase}. Response content: {content}");
            }
        }
    }

    private async Task<RecordingResponse> GetMeetingRecordings(string meetingId, string accessToken)
    {
        using (var client = new HttpClient())
        {
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

            var url = $"https://api.zoom.us/v2/meetings/{meetingId}/recordings";

            Console.WriteLine($"Requesting recordings for meeting ID: {meetingId}");

            var response = await client.GetAsync(url);
            var content = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                var recordingResponse = JsonConvert.DeserializeObject<RecordingResponse>(content);
                return recordingResponse;
            }
            else
            {
                throw new Exception($"Failed to get meeting recordings: {response.StatusCode} {response.ReasonPhrase}. Response content: {content}");
            }
        }
    }

    private async Task<byte[]> DownloadRecordingFile(string downloadUrl, string accessToken)
    {
        using (var client = new HttpClient())
        {
            // Append access_token as query parameter
            var url = $"{downloadUrl}?access_token={accessToken}";

            var response = await client.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsByteArrayAsync();
                return data;
            }
            else
            {
                throw new Exception($"Failed to download recording file: {response.StatusCode} {response.ReasonPhrase}");
            }
        }
    }
}