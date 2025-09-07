{% extends "src/templates/template.html.jinja" %}
{% block content %}
{% from "src/templates/macros.jinja" import translations, summary, figure %}


{{summary("trz")}}

## Illustrations

{% set src = "https://artisticanatomy.sfo3.cdn.digitaloceanspaces.com/richer/plate54.webp" %}
{% set alt = "Richer Plate 54" %}
{% set caption = "Richer, Plate 54" %}
{{ figure(
    src=src,
    alt=alt,
    caption=caption
) }}

{% set src = "https://upload.wikimedia.org/wikipedia/commons/a/aa/Trapezius_animation_small2.gif?20121019044756" %}
{% set alt = "Trapezius animation small2" %}
{% set caption = "<a href='https://commons.wikimedia.org/wiki/File:Trapezius_animation_small2.gif'>Anatomography</a>, <a href='https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en'>CC BY-SA 2.1 JP</a>, via Wikimedia Commons" %}
{% set href = "https://commons.wikimedia.org/wiki/File:Trapezius_animation_small2.gif" %}
{{ figure(
    src=src,
    alt=alt,
    caption=caption,
    href=href,
    width=256
) }}

{{translations('trz')}}

```python
include("build/muscles/ld-trz-attachments/index.md")
```

## See also

* {{ linktitle('dt') }}

## References

* [Wikipedia](https://en.wikipedia.org/wiki/Trapezius)
* {{ linktitle('gf') }}, 148-150.
* {{ linktitle('hc77') }}
  * **20**: Raphael. The left arm activates trapezius and other related muscles.  
    <img class="thumbnail inline-block" src="https://artisticanatomy.sfo3.cdn.digitaloceanspaces.com/artists/raphael/ue8qfowmfep6nvqsq3gn.webp"
alt="Raphael, Three Standing Men, c. 1514–16" loading="lazy"/>
  * **22**: Raphael. Right arm bent, raised. "The trapezius moves over the superior angle of the scapula
    (E), which it holds against the rib cage, and then inserts into the spine
    (M) and the acronmion process (N) of the scapula."
  * **28**: Tiepolo. Left scapula retraction. Right scapula protraction.
  * TODO 106, 108, 110, 112, 114, 116, 118, 126, 128, 130, 182, 190, 192, 194, 196, 198, 200, 202, 247, 250, 251, 252.
{% endblock %}
