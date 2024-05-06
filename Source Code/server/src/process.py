import csv

prompt_mapping = {
    "What hairstyle is suitable for a formal job interview": 1,
    "Where is the best location to watch a sunset": 2,
    "How can you motivate yourself to stay focused and productive while working from home": 3,
    "What type of music is calming and conducive to relaxation": 4,
    "When is the right time to start teaching children about financial responsibility": 5,
    "What caske is most likely to be enjoyed at a 10 year olds birthday party": 6,
    "What is the best way to console a child who lost their favorite toy": 7,
    "When is the best time of the day to go to the grocery store": 8,
    "What is the best clothing to wear to a funeral": 9,
    "What country is the most likely to not exist in 50 years": 10,
    "Where is the safest place to raise a family": 11,
    "How do I get out of a toxic relationship": 12,
    "How do you handle criticism at work": 13,
    "Whats your go-to method for unwinding after a stressful day": 14,
    "Do you think its essential to always tell the truth": 15,
    "How do you decide when its time to end a friendship": 16,
    "What does success mean to you": 17,
    "When is it okay to put yourself before others": 18,
    "How do you usually react when things dont go your way": 19,
    "Whats something that scares you about the future": 20,
    "How do you feel about the pace of technological change": 21,
    "Whats the most challenging part of maintaining relationships": 22,
    "How do you feel about the idea of lifelong learning": 23,
    "How important is it to stay true to your roots": 24
}

input_filename = 'responses.csv'
output_filename = 'output.csv'

with open(input_filename, mode='r', newline='', encoding='utf-8') as infile, \
     open(output_filename, mode='w', newline='', encoding='utf-8') as outfile:
    reader = csv.reader(infile)
    writer = csv.writer(outfile)
    
    previous_line = None
    
    for line in reader:
        if previous_line is not None:
            id1, id2, id3, rating = line
            rating = rating.split('-')[0].strip()
            prompt = previous_line[3].strip('.')
            if prompt in prompt_mapping:
                key = prompt_mapping[prompt]
            
                writer.writerow([id1, id2, id3, key, rating])
            
            previous_line = None
        else:
            previous_line = line

print("Data processing complete. The output is saved in 'output.csv'.")
