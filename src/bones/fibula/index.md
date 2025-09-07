{% extends "src/templates/template.html.jinja" %}
{% block content %}
{% from "src/templates/macros.jinja" import insertions, bony_landmarks, figure, origins, anchor %}

## Summary

The fibula is the slender lateral bone of the leg that runs parallel to the
{{ linkicon('tibia') }}. It bears little weight but provides surfaces for
muscle attachment and forms the outer part of the ankle joint.

## Illustrations

{% set src = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Fibula_-_anterior_view.png/512px-Fibula_-_anterior_view.png?20130217180651" %}
{% set alt = "Illustration of the human skeleton with fibulas (or calf bones) highlighted in red." %}
{% set caption = "<a href='https://commons.wikimedia.org/wiki/File:Fibula_-_anterior_view.png'>Anatomography</a>, <a href='https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en'>CC BY-SA 2.1 JP</a>, via Wikimedia Commons" %}
{% set href = "https://commons.wikimedia.org/wiki/File:Fibula_-_anterior_view.png" %}
{{ figure(
    src=src,
    alt=alt,
    caption=caption,
    href=href,
    width=512
) }}

{% set src = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Braus_1921_293.png/512px-Braus_1921_293.png?20191020103721" %}
{% set alt = "Braus 1921 293" %}
{% set caption = "<a href='https://commons.wikimedia.org/wiki/File:Braus_1921_293.png'>Braus, Hermann</a>, Public domain, via Wikimedia Commons" %}
{% set href = "https://commons.wikimedia.org/wiki/File:Braus_1921_293.png" %}
{{ figure(
    src=src,
    alt=alt,
    caption=caption,
    href=href,
    width=512
) }}

## Bony Landmarks

{{ bony_landmarks('fibula') }}

## Muscle Origins {{ anchor('origins') }}
{{ origins('fibula') }}

## Muscle Insertions {{ anchor('insertions') }}

{{ insertions('fibula') }}

## References
* [Wikipedia](https://en.wikipedia.org/wiki/Fibula)
{% endblock %}
