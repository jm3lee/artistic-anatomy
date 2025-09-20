{% from "src/templates/macros.jinja" import summary %}

{{summary("bfem")}}

## Illustrations

{% set src = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Grays_anatomy_1918_plate_434_biceps_femoris_muscle_both_heads_marked.png/128px-Grays_anatomy_1918_plate_434_biceps_femoris_muscle_both_heads_marked.png?20200906140612" %}
{% set alt = "Biceps femoris coloured in red (large head) and yellow (small head)" %}
{% set caption = "<a href='https://commons.wikimedia.org/wiki/File:Grays_anatomy_1918_plate_434_biceps_femoris_muscle_both_heads_marked.png'>Fredrik x nilsson</a>, <a href='https://creativecommons.org/licenses/by-sa/4.0'>CC BY-SA 4.0</a>, via Wikimedia Commons" %}
{% set href = "https://commons.wikimedia.org/wiki/File:Grays_anatomy_1918_plate_434_biceps_femoris_muscle_both_heads_marked.png" %}
{{ figure(
    src=src,
    alt=alt,
    caption=caption,
    href=href,
    width=128
) }}

## References

* {{ linktitle('biceps-femoris-muscle-wikipedia') }}
