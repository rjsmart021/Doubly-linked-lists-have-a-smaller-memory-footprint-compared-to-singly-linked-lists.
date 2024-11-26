from flask import Flask, jsonify

video_titles = [
    "The Art of Coding",
    "Exploring the Cosmos",
    "Cooking Masterclass: Italian Cuisine",
    "History Uncovered: Ancient Civilizations",
    "Fitness Fundamentals: Strength Training",
    "Digital Photography Essentials",
    "Financial Planning for Beginners",
    "Nature's Wonders: National Geographic",
    "Artificial Intelligence Revolution",
    "Travel Diaries: Discovering Europe"
]

app = Flask(__name__)



@app.route('/search/<title>', methods=['GET'])
def search_by_title(title):
    results = []
    for video in video_titles:
        if title.lower() in video.lower():
            results.append({'title': video})
    if not results:
        return jsonify({'error': 'No video titles match your search'}), 400
    return jsonify(results), 200


@app.route('/video-list', methods=['GET'])
def merge_sort_videos(videos=None):
    if videos == None:
        videos = video_titles

    if len(videos) > 1:
        mid = len(videos) // 2
        left = videos[:mid]
        right = videos[mid:]

        merge_sort_videos(left)
        merge_sort_videos(right)

        i = j = k = 0

        while i < len(left) and j < len(right):
            if left[i] < right[j]:
                videos[k] = left[i]
                i += 1
            else:
                videos[k] = right[j]
                j += 1
            k += 1

        while i < len(left):
            videos[k] = left[i]
            i += 1
            k += 1

        while j < len(right):
            videos[k] = right[j]
            j += 1
            k += 1

    video_list = []
    for video in videos:
        video_list.append({'title': video})

    return jsonify(video_list), 200



if __name__ == '__main__':
    app.run(debug=True)
