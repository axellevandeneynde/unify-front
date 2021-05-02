export default {
  "engineName": "unify",
  "endpointBase": process.env.REACT_APP_ELASTIC_URL,
  "searchKey": process.env.REACT_APP_ELASTIC_SEARCH_KEY,
  "resultFields": [
    "url",
    "title",
    "labels",
    "id",
    "date",
    "image",
    "description",
    "rss_categories",
    "source_logo",
    "source_name",
    "source_description",
    "source_website",
    "source_categories",
    "source_regions"
  ],
  "sortFields": [],
  "facets": []
}