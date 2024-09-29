using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

class Parser
{
    public async Task<string> ParseJsonToTextFileAsync(string jsonFilePath, string outputFilePath)
    {
        try
        {
            // Read the JSON file asynchronously
            var jsonData = await File.ReadAllTextAsync(jsonFilePath);
            Console.WriteLine("JSON file read successfully.");

            // Parse the JSON and navigate to the sections needed
            JObject jsonObject = JObject.Parse(jsonData);
            var audioSegments = jsonObject["results"]?["speaker_labels"]?["segments"];
            var items = jsonObject["results"]?["items"];

            if (audioSegments == null || items == null)
            {
                Console.WriteLine("Error: 'audio_segments' or 'items' not found in the JSON.");
                return null;
            }

            Console.WriteLine($"Found {audioSegments.Count()} segments and {items.Count()} items.");

            // Prepare to write to the text file
            using (StreamWriter writer = new StreamWriter(outputFilePath))
            {
                string previousSpeaker = null;
                string currentTranscript = ""; // To accumulate words for the current speaker

                foreach (var segment in audioSegments)
                {
                    string speakerLabel = (string)segment["speaker_label"];
                    var segmentItems = segment["items"]
                        .Select(i => (string)i["start_time"])
                        .ToList();

                    if (!segmentItems.Any())
                    {
                        Console.WriteLine("No items found for this segment.");
                        continue;
                    }

                    // Aggregate words for the current segment based on item indices
                    foreach (var item in items)
                    {
                        // Match item start time with segment start time
                        if (segmentItems.Contains((string)item["start_time"]))
                        {
                            string content = (string)item["alternatives"]?[0]?["content"];
                            if (!string.IsNullOrWhiteSpace(content))
                            {
                                currentTranscript += content + " ";
                            }
                        }
                    }

                    // Determine speaker ID based on the speaker label
                    string speakerID = speakerLabel == "spk_0" ? "Doctor" : "Patient";

                    // If the speaker changes, write the accumulated transcript to the file
                    if (previousSpeaker != null && previousSpeaker != speakerID)
                    {
                        await writer.WriteLineAsync($"{previousSpeaker}: \"{currentTranscript.Trim()}\"");
                        currentTranscript = ""; // Reset the transcript for the new speaker
                    }

                    previousSpeaker = speakerID;
                }

                // Write any remaining transcript for the last speaker
                if (!string.IsNullOrWhiteSpace(currentTranscript))
                {
                    await writer.WriteLineAsync($"{previousSpeaker}: \"{currentTranscript.Trim()}\"");
                }
            }

            Console.WriteLine("Writing to output file completed.");
            return outputFilePath; // Return the file path for further processing
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error in Parser: {ex.Message}");
            return null;
        }
    }
}