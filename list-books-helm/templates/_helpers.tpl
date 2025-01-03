{{/*
Expand the name of the chart.
*/}}
{{- define "list-books-helm.name" -}}
{{- default .Values.name | trunc 63 }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "list-books-helm.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "list-books-helm.labels" -}}
helm.sh/chart: {{ include "list-books-helm.chart" . }}
{{ include "list-books-helm.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "list-books-helm.selectorLabels" -}}
app.kubernetes.io/name: {{ include "list-books-helm.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
