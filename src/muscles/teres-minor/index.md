{% extends "src/templates/template.html.jinja" %}
{% block content %}
{% from "src/templates/macros.jinja" import translations, summary, figure %}


{{summary("teres-minor")}}

## Illustrations

{% set src = "https://upload.wikimedia.org/wikipedia/commons/4/41/Teres_minor_muscle_animation2.gif?20121121033256" %}
{% set alt = "Teres minor muscle animation2" %}
{% set caption = "<a href='https://commons.wikimedia.org/wiki/File:Teres_minor_muscle_animation2.gif'>Anatomography</a>, <a href='https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en'>CC BY-SA 2.1 JP</a>, via Wikimedia Commons" %}
{% set href = "https://commons.wikimedia.org/wiki/File:Teres_minor_muscle_animation2.gif" %}
{{ figure(
    src=src,
    alt=alt,
    caption=caption,
    href=href
) }}

{{translations('teres-minor')}}

## Notes

The teres minor muscle is usually not visible because it blends with the
{{ linkicon('infraspinatus') }} muscle. Both are covered by thick fascia.
However, the teres minor may become visible if the arm is held straight out to
the side, rotated outward, and pushed downward and backward against resistance.

One of the {{ linkicon('rotator-cuff') }} muscles.

```python
include('src/muscles/teres-major-minor-insertion/index.md')
```

## References

- {{ linktitle('gf') }}
  - **161**
    - Usually not visible on the surface, blends with
      {{ linkicon('infraspinatus') }}. Both muscles are covered by dense fascia.
    - May become visible when the arm is held horizontally, laterally rotated, and pushed downward and backward against resistance.
- {{ linktitle('hc77') }}
  - **114: Anthony Van Dyck, Studies of a Woman Sleeping**
    - "The mass (A) of the {{ linkicon('infraspinatus') }} and the *teres minor*
      beneath it ...
      which are outward rotators, are inactive."
  - **252: Richer Plate 21, Lateral Aspect**
- {{ linktitle('infraspinatus') }}
- {{ linktitle('rotator-cuff') }}
- [Wikipedia](https://en.wikipedia.org/wiki/Teres_minor_muscle)
{% endblock %}
