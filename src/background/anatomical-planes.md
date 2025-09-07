{% extends "src/templates/template.html.jinja" %}
{% block content %}
<dl>
  <dt>Sagittal</dt>
  <dd>
    <dl>
      <dt>Divides Body Into</dt>
      <dd>Left / Right</dd>
      <dt>Movements (Examples)</dt>
      <dd>Flexion & Extension (nodding, elbow bend)</dd>
    </dl>
  </dd>

  <dt>Frontal (Coronal)</dt>
  <dd>
    <dl>
      <dt>Divides Body Into</dt>
      <dd>Front / Back</dd>
      <dt>Movements (Examples)</dt>
      <dd>Abduction & Adduction (lifting arm to side)</dd>
    </dl>
  </dd>

  <dt>Transverse (Horizontal)</dt>
  <dd>
    <dl>
      <dt>Divides Body Into</dt>
      <dd>Top / Bottom</dd>
      <dt>Movements (Examples)</dt>
      <dd>Rotation (twisting at the waist)</dd>
    </dl>
  </dd>

  <dt>Oblique</dt>
  <dd>
    <dl>
      <dt>Divides Body Into</dt>
      <dd>Diagonal slices</dd>
      <dt>Movements (Examples)</dt>
      <dd>Combined movements (reaching across the body)</dd>
    </dl>
  </dd>
</dl>
{% endblock %}
