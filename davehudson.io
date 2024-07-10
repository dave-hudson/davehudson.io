server {
	listen 80;
	server_name davehudson.io www.davehudson.io;

	return 301 https://davehudson.io$request_uri;
}

server {
	listen 443 ssl;
	server_name davehudson.io;

	root /var/www/davehudson.io;
	index /index.html;

	location / {
		try_files $uri $uri/index.html /spa.html;
	}

	location /ws {
		proxy_pass http://127.0.0.1:7890;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection "upgrade";
		proxy_set_header Host $host;
		proxy_cache_bypass $http_upgrade;
	}

	error_page 404 /spa.html;

	location ~* \.(?:ico|css|js|gif|jpe?g|png|webp|html|ttf|woff|woff2)$ {
		expires 2m;
		add_header Cache-Control "public, must-revalidate, proxy-revalidate";
	}

	add_header X-Content-Type-Options "nosniff";

	charset utf-8;

	ssl_certificate /etc/letsencrypt/live/davehudson.io/fullchain.pem; # managed by Certbot
	ssl_certificate_key /etc/letsencrypt/live/davehudson.io/privkey.pem; # managed by Certbot
	include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
	ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

