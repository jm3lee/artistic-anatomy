{% extends "src/templates/muscle.jinja" %}

{% block intro %}
The term "teres major" refers to a muscle in the upper limb, specifically
located in the shoulder area. The etymology of "teres major" comes from Latin:

* "Teres" means "round" or "smooth," indicating the shape of the muscle.
* "Major" means "greater" or "larger," distinguishing it from the "teres minor"
  muscle, which is smaller and has a different function.

So, "teres major" essentially translates to "the larger round muscle." This
muscle is involved in the movement of the shoulder and the upper arm,
specifically aiding in actions such as internal rotation, adduction, and
extension of the humerus.
{% endblock %}

{% block illustrations %}
{% set src = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Teres_major_muscle_back.png/512px-Teres_major_muscle_back.png?20121120113048" %}
{% set alt = "Teres major muscle back" %}
{% set caption = "<a href='https://commons.wikimedia.org/wiki/File:Teres_major_muscle_back.png'>Anatomography</a>, <a href='https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en'>CC BY-SA 2.1 JP</a>, via Wikimedia Commons" %}
{% set href = "https://commons.wikimedia.org/wiki/File:Teres_major_muscle_back.png" %}
{{ figure(
    src=src,
    alt=alt,
    caption=caption,
    href=href,
    width=512
) }}

```python
include('src/muscles/teres-major-minor-insertion/index.md')
```
{% endblock %}

{% block references %}
* [Wikipedia](https://en.wikipedia.org/wiki/Teres_major_muscle)
* {{ linktitle('teres-minor') }}
* {{ linktitle('gf') }}, 162–63
{% endblock %}
