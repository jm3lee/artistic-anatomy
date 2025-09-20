{% from "src/templates/macros.jinja" import translations, summary %}


{{summary("infraspinatus")}}

## Illustrations

{% set src = "https://upload.wikimedia.org/wikipedia/commons/8/8d/Infraspinatus_muscle_animation.gif?20121120170804" %}
{% set alt = "Infraspinatus muscle animation" %}
{% set caption = "Anatomography, CC BY-SA 2.1 JP, via Wikimedia Commons" %}
{% set href = "https://commons.wikimedia.org/wiki/File:Infraspinatus_muscle_animation.gif" %}
{{ figure(
    src=src,
    alt=alt,
    caption=caption,
    href=href
) }}

{% set src = "https://brianleeart.sfo3.cdn.digitaloceanspaces.com/richer/infraspinatus.jpg" %}
{% set alt = "Infraspinatus, Richer" %}
{{ figure(
    src=src,
    alt=alt
) }}

{{translations('infraspinatus')}}

## References

- {{ linktitle('glenohumeral-joint') }}
- {{ linktitle('rotator-cuff') }}
- {{ linktitle('gf') }}, 160.
- {{ linktitle('hc77') }}
  - **108: Rubens, Study of a River God for the Four Rivers**
    - "The supraspinatus (I) and the *infraspinatus (J)* steady the head of the humerus ... and assist ... the outward rotation and abduction of the arm."
  - **110: Michelangelo, Standing Nude, Seen from the Back**
    - "Below, we can see the *infraspinatus (L)*, ..."
    - Left shoulder flexion with external rotation.
  - 114-115, 126, 132, 138, 252 TODO
- {{ linktitle('infraspinatus-muscle-wikipedia') }}
