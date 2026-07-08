import json
import os
import sys
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parents[1]
PUBLICATIONS_PATH = ROOT / "publications.json"
SCHOLAR_ID = "Ibcfs-sAAAAJ"
SCHOLAR_PROFILE = f"https://scholar.google.com/citations?hl=zh-CN&user={SCHOLAR_ID}&view_op=list_works&sortby=pubdate"


def request_json(url):
    request = Request(url, headers={"User-Agent": "zhangli-site-publication-updater"})
    with urlopen(request, timeout=30) as response:
        return json.loads(response.read().decode("utf-8"))


def format_publication(article):
    title = article.get("title") or "Untitled"
    authors = article.get("authors") or ""
    year = article.get("year")

    venue_parts = []
    publication = article.get("publication")
    if publication:
        venue_parts.append(publication)
    if year:
        venue_parts.append(str(year))

    citation_id = article.get("citation_id")
    if citation_id:
        url = (
            "https://scholar.google.com/citations?"
            f"view_op=view_citation&hl=zh-CN&user={SCHOLAR_ID}&sortby=pubdate&citation_for_view={citation_id}"
        )
    else:
        url = article.get("link") or SCHOLAR_PROFILE

    return {
        "title": title,
        "authors": authors,
        "venue": ", ".join(venue_parts),
        "year": year,
        "url": url,
    }


def fetch_from_serpapi(api_key):
    params = urlencode(
        {
            "engine": "google_scholar_author",
            "author_id": SCHOLAR_ID,
            "sort": "pubdate",
            "num": 20,
            "api_key": api_key,
        }
    )
    data = request_json(f"https://serpapi.com/search.json?{params}")
    articles = data.get("articles") or []
    publications = [format_publication(article) for article in articles[:10]]
    return [item for item in publications if item.get("title")]


def main():
    api_key = os.getenv("SERPAPI_KEY")
    if not api_key:
        print("SERPAPI_KEY is not set; keeping existing publications.json.")
        return 0

    publications = fetch_from_serpapi(api_key)
    if not publications:
        print("No publications returned; keeping existing publications.json.")
        return 0

    with PUBLICATIONS_PATH.open("w", encoding="utf-8") as handle:
        json.dump(publications, handle, ensure_ascii=False, indent=2)
        handle.write("\n")

    print(f"Updated {len(publications)} publications from Google Scholar via SerpApi.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
