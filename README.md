# Game ⨯ Tech (beta)

A web-based knowledge management system for visualizing game related technologies.

This repository can be viewed at [gamextech.org](http://gamextech.org/).

Currently the database is very limited. Please consider [contribution](#contribution).

## Target users

* Game developers
* Researchers
* Students

## Features

* Explore game and related technology, and their relationships
* Chronological view mode
* Share a view with URL
* Search nodes with regular expression
* Serverless for easy contribution and merging

## Dependinces

* [https://d3js.org/](D3)
* HTML/JavaScript/CSS/SVG/JSON

## Schema

The database contains a set of graphs.

The [database](database.json) and graphs are stored in [JSON](https://www.json.org/json-en.html) format.

Each graph JSON is an object, with "nodes" and "links" array.

### Node

Each node is an object with following keys (*required):

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

### Link

Each link is an object with following keys (*required):

| Key       | Type     | Description                     |  
| --------- | -------- | ------------------------------- |  
| source*   | string   | Source node id                  |  
| target*   | string   | Target node id                  |  
| type      | string   | "include" (default) or "derive" or "use" or "first-use" or "invent" |  

## Contribution

Contributions are welcome. Please follow:

1. Fork this repository
2. Add nodes or links in related json files. Add "contributor" key optionally.
3. Testing
4. Make Pull request

If there are too many nodes/links in a single file, you may extract them into a new JSON in a suitable directory,
and add the JSON file into `/database.json`.

If you want to add a lot of data or reorganize existing structure, you may create an GitHub issue for discussion.

Adding new features and fixing bugs are welcome as well.

### Testing

When testing locally, you need to start a http server
(because most browser does not accept reading json files in `file://`).
For example, using python 3's built-in http server:

~~~bash
python3 -m http.server
~~~

Then you can use `http://localhost:8000` to view the local site.
For testing single(or several) JSON, you may use `?d=` in query string, such as `http://localhost:8000/?d=/tech/graphics/shadow.json&e=-1`.

## History

* 2021/2/1: Initiate this project
* 2021/2/21: Beta launch with 706 nodes and 812 links
