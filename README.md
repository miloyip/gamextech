# Game ⨯ Tech

Visualize game related technology for knowledge management.

## Target users

* Game developers
* Researchers
* Students

## Features

* Explore technology and games which employ such
* Chronological view mode
* Share a view with URL
* Serverless for easy contribution and merging

## Schema

Nodes are array of objects with following keys (asterisk are must exist):

| Key         | Type                      | Description                                                  |
| ----------- | ------------------------- | ------------------------------------------------------------ |
| id*         | string                    | Unique idenfitifer in title case                             |
| abbr        | string                    | Abbreviation                                                 |
| aka         | string or array of string | Alternative names (also known as                             |
| type        | string                    | "category" (default) or "technique" or "game"                |
| year        | number                    | Year of invention or publicaiton                             |
| synopsis    | string                    | Concise description                                          |
| author      | string or array of string | Inventor(s) or author(s)                                     |
| link        | string or array of string | links of publication, wikipedia or other related information | 
| title       | string                    | Title of the first publication which reveals this            | 
| conference  | string                    | Abbreviation of conference name, e.g. GDC, SIGGRAPH          |
| journal     | string                    | Abbreviation of journal name, e.g. JCGT                      |
| organization| string or array of string | Company, institute or other organization                     |
| contributor | string or array of string | github usernames of whom contribute to this node             | 

Links are arrays of objects with following keys (asterisk are must exist):

| Key       | Type     | Description                     |  
| --------- | -------- | ------------------------------- |  
| source*   | string   | Source node id                  |  
| target*   | string   | Target node id                  |  
| type      | string   | "include" (default) or "derive" |  

## Contribution

Contributions are welcome. Please follow:

1. Fork this repository
2. Add nodes or links in related json files. Add "contributor" key optionally.
3. Testing
4. Make Pull request

If there are too many nodes/links in a single file, you may extract them into a new JSON in a directory,
and add the JSON file into `/database.json`.

### Testing

When testing locally, you need to start a http server
(because most browser does not accept reading json files in `file://`).
For example, using python 3's built-in http server:

~~~bash
python3 -m http.server
~~~

Then you can use `http://localhost:8000` to view the local site.
For testing single(or several) JSON, you may use `?d=` in query string, such as `http://localhost:8000/?d=/tech/graphics/shadow/shadow.json&e=-1`.
