{% from "src/templates/summary.jinja" import summary %}
{% from "src/templates/translations.jinja" import translations %}
{% from "src/templates/figure.jinja" import figure %}

{{summary("dt")}}

## Illustrations

{% set src = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Deltoid_muscle_origin_and_insertion.jpg/512px-Deltoid_muscle_origin_and_insertion.jpg?20240330105321" %}
{% set alt = "Origin and insertion of deltoid muscle" %}
{% set caption = "<a href='https://commons.wikimedia.org/wiki/File:Deltoid_muscle_origin_and_insertion.jpg'>Vishram Singh</a>, CC0, via Wikimedia Commons" %}
{% set href = "https://commons.wikimedia.org/wiki/File:Deltoid_muscle_origin_and_insertion.jpg" %}
{{ figure(
    src=src,
    alt=alt,
    caption=caption,
    href=href,
    width=512
) }}

{{translations("dt")}}

## Examples

### Diana and Cupid by Pompeo Batoni, 1761

![The Posterior Portion of Deltoid](https://artisticanatomy.sfo3.cdn.digitaloceanspaces.com/images/0/20241208%20IG%20Post%20Artistic%20Anatomy%20Zoom.jpg)

![Diana and Cupid by Pompeo Batoni, 1761](https://artisticanatomy.sfo3.cdn.digitaloceanspaces.com/images/0/20241208%20435622%20deltoid.jpg)

## See Also

- [Arm Movements](../appendix/arm-movements.html)
- {{ linktitle('infraclavicular-fossa') }}

## References

* [Wikipedia](https://en.wikipedia.org/wiki/Deltoid_muscle)
* Richer, Plate 49
* {{ linktitle('hc77') }}
  * 26, 32, 106, 108, 114, 116, 118, 122-123, 126, 128, 130, 132, 134, 138, 144, 146, 148, 150, 152, 182, 250, 251, 253, 254, 255
* {{ linktitle('gf') }}
  * 156–58
