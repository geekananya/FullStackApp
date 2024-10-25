from django.urls import path
from . import views

urlpatterns = [
    path('', views.welcome, name='root'),
    path('auth/login', views.login, name='login'),
    path('auth/register', views.register, name='register'),
    path('auth/logout', views.logout, name='logout'),
    # superuser only
    path('auth/getusers', views.get_users, name='getusers'),
    path('auth/deleteuser/<int:pk>', views.delete_user, name='deleteuser'),

    path('posts/get/', views.get_posts, name='getposts'),
    path('posts/get/<int:pk>', views.get_post, name='getpost'),
    path('posts/get/<str:tag>', views.search_post_by_tag, name='search'),
    path('posts/create', views.add_post, name='addpost'),
    path('posts/update/<int:pk>', views.update_post, name='updatepost'),
    path('posts/delete/<int:pk>', views.delete_post, name='deletepost'),
    path('posts/like/<int:pk>', views.like_post, name='likepost'),
    path('posts/unlike/<int:pk>', views.unlike_post, name='unlikepost'),
    path('posts/getlikes/', views.get_likes, name='getlikes'),
    path('posts/getlikestatus/<int:pk>', views.get_like_status, name='getlikestatus'),
]
