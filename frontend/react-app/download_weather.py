import os
import requests

# Weather code to icon name mapping
icon_map = {
    1000: '01d',
    1001: '04d',
    1100: '02d',
    1101: '03d',
    1102: '04d',
    2000: '50d',
    2100: '50d',
    3000: 'n/a', 
    3001: 'n/a', 
    3002: 'n/a', 
    4000: '09d', 
    4001: '10d', 
    4200: '09d', 
    4201: '10d', 
    5000: '13d', 
    5001: '13d', 
    5100: '13d', 
    5101: '13d', 
    6000: '13d', 
    6001: '13d', 
    6200: '13d', 
    6201: '13d', 
    7000: '13d', 
    7101: '13d', 
    7102: '13d', 
    8000: '11d', 
}

# Base URL for OpenWeatherMap icons
icon_base_url = 'http://openweathermap.org/img/wn/'

# Directory to save icons
icon_dir = './weather-icons'  # Update this with the correct path

# Function to download and save an icon
def download_icon(icon_name):
    url = f"{icon_base_url}{icon_name}@2x.png"
    response = requests.get(url)
    if response.status_code == 200:
        with open(os.path.join(icon_dir, f"{icon_name}.png"), 'wb') as file:
            file.write(response.content)
    else:
        print(f"Failed to download {icon_name}")

# Create the directory if it doesn't exist
if not os.path.exists(icon_dir):
    os.makedirs(icon_dir)

# Download each icon
for icon in icon_map.values():
    download_icon(icon)
    print(f"Downloaded icon: {icon}")

print("All icons downloaded successfully.")
