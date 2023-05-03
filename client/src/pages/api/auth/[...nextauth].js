import NextAuth from 'next-auth'
import AppleProvider from 'next-auth/providers/apple'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import VkProvider from "next-auth/providers/vk";
import YandexProvider from "next-auth/providers/yandex";

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    VkProvider({
      clientId: '51569492',
      clientSecret: 'H75Jlr9pxlIvTQQodXT4'
    }),
    YandexProvider({
      clientId: 'c8492e4d75874349b31d043a9f0b1536',
      clientSecret: '249788522cbd41d4a5666034800b731e'
    })
  ]
})