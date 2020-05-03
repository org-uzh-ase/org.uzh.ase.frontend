FROM nginx
EXPOSE 80
# CMD ["nginx"]
CMD ["nginx", "-g", "daemon off;"]


COPY dist/org-uzh-ase-frontend /usr/share/nginx/html
