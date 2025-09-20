{% from "src/templates/macros.jinja" import figure %}

## Summary

The **linea alba** is a fibrous midline structure that runs vertically along the
anterior abdominal wall. It forms where the aponeuroses of the left and right
abdominal muscles ({{ linkicon('external-oblique') }}, internal oblique, and transversus
abdominis) interlace.

It extends from the **xiphoid process** of the sternum to the **pubic
symphysis**, serving as an attachment site and central landmark that separates
the left and right rectus abdominis muscles. "Linea alba" means "white line" in
Latin, referring to its pale, tendinous appearance.

## Illustrations

{% set src = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Gray399.svg/512px-Gray399.svg.png?20080907064758" %}
{% set alt = "A labelled diagram of the anterior abdominal wall above the arcuate line." %}
{% set caption = "<a href='https://commons.wikimedia.org/wiki/File:Gray399.svg'>Henry Vandyke Carter</a>, Public domain, via Wikimedia Commons" %}
{% set href = "https://commons.wikimedia.org/wiki/File:Gray399.svg" %}
{{ figure(
    src=src,
    alt=alt,
    caption=caption,
    href=href,
    width=512
) }}

## References

- {{ linktitle('external-oblique') }}
- {{ linktitle('gf') }}, 137.
- {{ linktitle('linea-alba-abdomen-wikipedia') }}
