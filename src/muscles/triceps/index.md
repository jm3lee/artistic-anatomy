{% extends "src/templates/template.html.jinja" %}
{% block content %}
{% from "src/templates/macros.jinja" import translations, summary, figure %}


{{summary("trc")}}

## Illustrations

{% set src = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Triceps_brachii_muscle06.png/512px-Triceps_brachii_muscle06.png?20130727010753" %}
{% set alt = "Triceps brachii muscle06" %}
{% set caption = "<a href='https://commons.wikimedia.org/wiki/File:Triceps_brachii_muscle06.png'>Anatomography</a>, <a href='https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en'>CC BY-SA 2.1 JP</a>, via Wikimedia Commons" %}
{% set href = "https://commons.wikimedia.org/wiki/File:Triceps_brachii_muscle06.png" %}
{{ figure(
    src=src,
    alt=alt,
    caption=caption,
    href=href,
    width=512
) }}

- Red: Long head
- Yellow: Lateral head
- Green: Medial head

## Examples

### Triceps Tendon

<img
src="https://artisticanatomy.sfo3.cdn.digitaloceanspaces.com/muscles/triceps-0000.jpg"
alt="David and Goliath, Caravaggio, 1599"
loading="lazy"/>

{{translations('trc')}}

## References

* [Wikipedia](https://en.wikipedia.org/wiki/Triceps)
* {{ linktitle('gf') }}, 172-175.
* {{ linktitle('hc77') }}, 80, 112, 122, 138, 140, 144, 146, 148-149, 150-151, 152, 182, 253, 254, 255, 256.

## Related Muscles

* {{ linktitle('anc') }}
  The **triceps brachii** and **anconeus** are muscles that work together to
  straighten the elbow.
  * The **triceps** is the bigger muscle with three parts and does most of the
    work to extend the arm.
  * The **anconeus** is a smaller helper muscle near the elbow. It assists the
    triceps and helps stabilize the joint during movement.

  They are closely connected and often work as a team for elbow extension and
  stability.
* {{ linktitle('teres-major') }}
* {{ linktitle('teres-minor') }}
* {{ linktitle('ld') }}
{% endblock %}
