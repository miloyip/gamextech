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
| type        | string                    | "category" (default) or "technique" or "game"                          |
| year        | number                    | Year of invention or publicaiton                             |
| synopsis    | string                    | Concise description                                          |
| author      | string or array of string | Inventor(s) or author(s)                                     |
| link        | string or array of string | links of publication, wikipedia or other related information | 
| title       | string                    | Title of the first publication which reveals this            | 
| conference  | string                    | Abbreviation of conference name, e.g. GDC, SIGGRAPH          |
| journal     | string                    | Abbreviation of journal name, e.g. JCGT                      |
| contributor | string or array of string | github usernames of whom contribute to this node             | 

Links are arrays of objects with following keys (asterisk are must exist):

| Key       | Type     | Description                     |  
| --------- | -------- | ------------------------------- |  
| source*   | string   | Source node id                  |  
| target*   | string   | Target node id                  |  
| type      | string   | "include" (default) or "derive" |  
